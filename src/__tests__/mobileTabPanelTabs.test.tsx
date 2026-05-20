import React, { act } from 'react';
import { createRoot, Root } from 'react-dom/client';
import MobileTabPanel from '@/components/MobileTabPanel';

const mockStoreState = {
  isEditMode: false,
  robot: { isRunningQueue: false },
  commandQueue: [],
};

jest.mock('@/sim/robotController', () => ({
  useSimulatorStore: (selector: (state: typeof mockStoreState) => unknown) => selector(mockStoreState),
}));

jest.mock('@/components/RobotControls', () => function RobotControlsMock() { return <div>MOBILE_CONTROLS</div>; });
jest.mock('@/components/ScenarioSelector', () => function ScenarioSelectorMock() { return <div>MOBILE_SCENARIOS</div>; });
jest.mock('@/components/LessonsSidebar', () => function LessonsSidebarMock() { return <div>MOBILE_LESSONS</div>; });
jest.mock('@/components/CommandQueue', () => function CommandQueueMock() { return <div>MOBILE_COMMAND_QUEUE</div>; });
jest.mock('@/components/TelemetryPanel', () => function TelemetryPanelMock() { return <div>MOBILE_TELEMETRY</div>; });
jest.mock('@/components/EventLog', () => function EventLogMock() { return <div>MOBILE_EVENT_LOG</div>; });
jest.mock('@/components/ArenaEditor', () => function ArenaEditorMock() { return <div>MOBILE_ARENA_EDITOR</div>; });
jest.mock('@/components/ModelLibrary', () => function ModelLibraryMock() { return <div>MOBILE_MODEL_LIBRARY</div>; });
jest.mock('@/components/SavedScenes', () => function SavedScenesMock() { return <div>MOBILE_SAVED_SCENES</div>; });
jest.mock('@/components/MobileEditOverlay', () => function MobileEditOverlayMock() { return <div>MOBILE_EDIT_CONTROLS</div>; });
jest.mock('@/components/BlocklyPanel', () => function BlocklyPanelMock() { return <div>MOBILE_BLOCKLY_PANEL</div>; });

describe('MobileTabPanel tabs', () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    mockStoreState.isEditMode = false;
    (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    container.remove();
  });

  it('renders mobile tab row in order: Program, Queue, Arena, Info', () => {
    act(() => {
      root.render(<MobileTabPanel />);
    });

    const tabLabels = Array.from(container.querySelectorAll('nav[aria-label="Simulator panels"] button'))
      .map((button) => button.getAttribute('aria-label'));

    expect(tabLabels).toEqual(['Program', 'Queue', 'Arena', 'Info']);
  });

  it('shows arena setup content when Arena tab is selected', () => {
    act(() => {
      root.render(<MobileTabPanel />);
    });

    const arenaTab = container.querySelector('button[aria-label="Arena"]') as HTMLButtonElement;
    expect(arenaTab).not.toBeNull();
    act(() => {
      arenaTab.click();
    });

    expect(container.textContent).toContain('MOBILE_SCENARIOS');
    expect(container.textContent).toContain('MOBILE_LESSONS');
    expect(container.textContent).not.toContain('MOBILE_ARENA_EDITOR');
    expect(container.textContent).not.toContain('MOBILE_MODEL_LIBRARY');
    expect(container.textContent).not.toContain('MOBILE_SAVED_SCENES');
    expect(container.textContent).not.toContain('MOBILE_COMMAND_QUEUE');
    expect(container.textContent).not.toContain('MOBILE_CONTROLS');
  });

  it('forces arena edit content when edit mode becomes active', async () => {
    act(() => {
      root.render(<MobileTabPanel />);
    });

    const infoTabBeforeEdit = container.querySelector('button[aria-label="Info"]') as HTMLButtonElement;
    expect(infoTabBeforeEdit).not.toBeNull();
    act(() => {
      infoTabBeforeEdit.click();
    });
    expect(container.textContent).toContain('MOBILE_TELEMETRY');

    mockStoreState.isEditMode = true;
    act(() => {
      root.render(<MobileTabPanel />);
    });
    await act(async () => {
      await new Promise((resolve) => window.setTimeout(resolve, 0));
    });

    const arenaTab = container.querySelector('button[aria-label="Arena"]') as HTMLButtonElement;
    expect(arenaTab).not.toBeNull();
    expect(arenaTab.getAttribute('aria-pressed')).toBe('true');

    expect(container.textContent).toContain('EDIT MODE: ON');
    expect(container.textContent).toContain('MOBILE_ARENA_EDITOR');
    expect(container.textContent).toContain('MOBILE_MODEL_LIBRARY');
    expect(container.textContent).toContain('MOBILE_SAVED_SCENES');
    expect(container.textContent).toContain('MOBILE_EDIT_CONTROLS');
    expect(container.textContent).not.toContain('MOBILE_COMMAND_QUEUE');
    expect(container.textContent).not.toContain('MOBILE_CONTROLS');
    expect(container.textContent).not.toContain('MOBILE_TELEMETRY');
  });

  it('keeps info tab dedicated to telemetry and logs only', () => {
    act(() => {
      root.render(<MobileTabPanel />);
    });

    const infoTab = container.querySelector('button[aria-label="Info"]') as HTMLButtonElement;
    expect(infoTab).not.toBeNull();
    act(() => {
      infoTab.click();
    });

    expect(container.textContent).toContain('MOBILE_TELEMETRY');
    expect(container.textContent).toContain('MOBILE_EVENT_LOG');
    expect(container.textContent).not.toContain('MOBILE_ARENA_EDITOR');
    expect(container.textContent).not.toContain('MOBILE_COMMAND_QUEUE');
    expect(container.textContent).not.toContain('MOBILE_CONTROLS');
  });

  it('shows Blockly in Program tab and queue controls in Queue tab', () => {
    act(() => {
      root.render(<MobileTabPanel />);
    });

    expect(container.textContent).toContain('MOBILE_BLOCKLY_PANEL');
    expect(container.textContent).not.toContain('MOBILE_COMMAND_QUEUE');
    expect(container.textContent).not.toContain('MOBILE_CONTROLS');

    const queueTab = container.querySelector('button[aria-label="Queue"]') as HTMLButtonElement;
    expect(queueTab).not.toBeNull();
    act(() => {
      queueTab.click();
    });

    expect(container.textContent).toContain('MOBILE_COMMAND_QUEUE');
    expect(container.textContent).toContain('MOBILE_CONTROLS');
    expect(container.textContent).not.toContain('MOBILE_ARENA_EDITOR');
    expect(container.textContent).not.toContain('MOBILE_MODEL_LIBRARY');
    expect(container.textContent).not.toContain('MOBILE_SAVED_SCENES');
    expect(container.textContent).not.toContain('MOBILE_EDIT_CONTROLS');
    expect(container.textContent).not.toContain('EDIT MODE: ON');
  });
});
