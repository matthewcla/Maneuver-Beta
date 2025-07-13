import TrafficSim, { DEFAULT_ARGS } from '../src/traffic/TrafficSim'

/** Verify starboard crossing classification */
test('starboard crossing encounter is detected', () => {
  const sim = new TrafficSim(DEFAULT_ARGS)
  // A heading east
  sim.addTrack('A', [-1000, 0], [[1000, 0]], 5)
  // B approaches from starboard heading north
  sim.addTrack('B', [0, -1000], [[0, 1000]], 5)

  sim.tick()

  const tracks = (sim as any).tracks
  expect(tracks.get('A').encounter).toBe('crossingStarboard')
  expect(tracks.get('B').encounter).toBe('crossingPort')
})

/** Verify port crossing classification */
test('port crossing encounter is detected', () => {
  const sim = new TrafficSim(DEFAULT_ARGS)
  // A heading east
  sim.addTrack('A', [-1000, 0], [[1000, 0]], 5)
  // C approaches from port heading south
  sim.addTrack('C', [0, 1000], [[0, -1000]], 5)

  sim.tick()

  const tracks = (sim as any).tracks
  expect(tracks.get('A').encounter).toBe('crossingPort')
  expect(tracks.get('C').encounter).toBe('crossingStarboard')
})
