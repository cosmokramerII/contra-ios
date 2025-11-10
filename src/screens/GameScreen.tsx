import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  Animated,
  PanResponder,
} from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface PlayerPosition {
  x: number;
  y: number;
}

interface Enemy {
  id: number;
  x: number;
  y: number;
}

interface Bullet {
  id: number;
  x: number;
  y: number;
}

export default function GameScreen() {
  const [playerPosition, setPlayerPosition] = useState<PlayerPosition>({
    x: 50,
    y: SCREEN_HEIGHT / 2,
  });
  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const [bullets, setBullets] = useState<Bullet[]>([]);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const bulletIdCounter = useRef(0);
  const enemyIdCounter = useRef(0);
  const gameLoop = useRef<NodeJS.Timeout>();
  const enemySpawnInterval = useRef<NodeJS.Timeout>();

  // Player movement with touch
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        const newY = Math.max(
          20,
          Math.min(SCREEN_HEIGHT - 60, playerPosition.y + gestureState.dy)
        );
        setPlayerPosition({ ...playerPosition, y: newY });
      },
    })
  ).current;

  // Shoot bullet
  const shoot = () => {
    if (!gameStarted || gameOver) return;
    
    const newBullet: Bullet = {
      id: bulletIdCounter.current++,
      x: playerPosition.x + 40,
      y: playerPosition.y + 15,
    };
    setBullets((prev) => [...prev, newBullet]);
  };

  // Start game
  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setEnemies([]);
    setBullets([]);
    setPlayerPosition({ x: 50, y: SCREEN_HEIGHT / 2 });
  };

  // Game loop
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    gameLoop.current = setInterval(() => {
      // Move bullets
      setBullets((prev) =>
        prev
          .map((bullet) => ({ ...bullet, x: bullet.x + 10 }))
          .filter((bullet) => bullet.x < SCREEN_WIDTH)
      );

      // Move enemies
      setEnemies((prev) =>
        prev
          .map((enemy) => ({ ...enemy, x: enemy.x - 5 }))
          .filter((enemy) => {
            // Check if enemy hit player
            if (
              Math.abs(enemy.x - playerPosition.x) < 40 &&
              Math.abs(enemy.y - playerPosition.y) < 40
            ) {
              setGameOver(true);
              return false;
            }
            return enemy.x > -50;
          })
      );

      // Check bullet collisions
      setBullets((prevBullets) => {
        const remainingBullets = [...prevBullets];
        setEnemies((prevEnemies) => {
          const remainingEnemies = [...prevEnemies];
          
          prevBullets.forEach((bullet) => {
            prevEnemies.forEach((enemy, enemyIndex) => {
              if (
                Math.abs(bullet.x - enemy.x) < 30 &&
                Math.abs(bullet.y - enemy.y) < 30
              ) {
                // Remove enemy and bullet
                const bulletIndex = remainingBullets.findIndex(b => b.id === bullet.id);
                if (bulletIndex !== -1) {
                  remainingBullets.splice(bulletIndex, 1);
                }
                remainingEnemies.splice(enemyIndex, 1);
                setScore((prev) => prev + 10);
              }
            });
          });
          
          return remainingEnemies;
        });
        
        return remainingBullets;
      });
    }, 1000 / 30); // 30 FPS

    // Spawn enemies
    enemySpawnInterval.current = setInterval(() => {
      const newEnemy: Enemy = {
        id: enemyIdCounter.current++,
        x: SCREEN_WIDTH,
        y: Math.random() * (SCREEN_HEIGHT - 100) + 50,
      };
      setEnemies((prev) => [...prev, newEnemy]);
    }, 2000);

    return () => {
      if (gameLoop.current) clearInterval(gameLoop.current);
      if (enemySpawnInterval.current) clearInterval(enemySpawnInterval.current);
    };
  }, [gameStarted, gameOver, playerPosition]);

  return (
    <View style={styles.container}>
      {/* Score */}
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>Score: {score}</Text>
      </View>

      {/* Game Area */}
      <View style={styles.gameArea}>
        {/* Player */}
        {gameStarted && !gameOver && (
          <View
            style={[
              styles.player,
              { left: playerPosition.x, top: playerPosition.y },
            ]}
            {...panResponder.panHandlers}
          >
            <Text style={styles.playerText}>▶</Text>
          </View>
        )}

        {/* Enemies */}
        {enemies.map((enemy) => (
          <View
            key={enemy.id}
            style={[styles.enemy, { left: enemy.x, top: enemy.y }]}
          >
            <Text style={styles.enemyText}>◀</Text>
          </View>
        ))}

        {/* Bullets */}
        {bullets.map((bullet) => (
          <View
            key={bullet.id}
            style={[styles.bullet, { left: bullet.x, top: bullet.y }]}
          />
        ))}
      </View>

      {/* Controls */}
      {gameStarted && !gameOver && (
        <View style={styles.controls}>
          <TouchableOpacity style={styles.button} onPress={shoot}>
            <Text style={styles.buttonText}>SHOOT</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Start/Game Over Screen */}
      {(!gameStarted || gameOver) && (
        <View style={styles.overlay}>
          <Text style={styles.title}>RetroGunner</Text>
          {gameOver && (
            <Text style={styles.gameOverText}>Game Over! Score: {score}</Text>
          )}
          <TouchableOpacity style={styles.startButton} onPress={startGame}>
            <Text style={styles.startButtonText}>
              {gameOver ? 'RESTART' : 'START GAME'}
            </Text>
          </TouchableOpacity>
          {!gameOver && (
            <Text style={styles.instructions}>
              Drag player up/down to move{'\n'}
              Tap SHOOT to fire{'\n'}
              Avoid enemies!
            </Text>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a1a',
  },
  scoreContainer: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
  },
  scoreText: {
    color: '#00ff00',
    fontSize: 24,
    fontWeight: 'bold',
  },
  gameArea: {
    flex: 1,
    backgroundColor: '#1a1a3a',
  },
  player: {
    position: 'absolute',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playerText: {
    fontSize: 32,
    color: '#00ff00',
  },
  enemy: {
    position: 'absolute',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  enemyText: {
    fontSize: 32,
    color: '#ff0000',
  },
  bullet: {
    position: 'absolute',
    width: 10,
    height: 4,
    backgroundColor: '#ffff00',
  },
  controls: {
    position: 'absolute',
    bottom: 40,
    right: 40,
    flexDirection: 'row',
    gap: 20,
  },
  button: {
    backgroundColor: '#00ff00',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#00ff00',
    marginBottom: 20,
  },
  gameOverText: {
    fontSize: 24,
    color: '#ff0000',
    marginBottom: 20,
  },
  startButton: {
    backgroundColor: '#00ff00',
    paddingHorizontal: 50,
    paddingVertical: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  startButtonText: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
  },
  instructions: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
});
