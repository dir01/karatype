import * as React from "react";
import "./App.css";
import { Keyboard, layouts } from "./components/Keyboard/Keyboard";
import TextToType from "./components/TextToType/TextToType";
import Toolbar from "./components/Toolbar/Toolbar";
import { IExercise } from "./core/Exercise";
import { ITutor } from "./core/Tutor";

const soundPaths = {
  error: "/sounds/error.wav",
  keystroke: "/sounds/keystroke.wav"
};

type AppProps = { tutor: ITutor };

class App extends React.Component<AppProps> {
  private currentExercise: IExercise | null;

  constructor(props: AppProps) {
    super(props);
    this.handleLevelChange = this.handleLevelChange.bind(this);
    this.handleSkip = this.handleSkip.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  public render() {
    return (
      <div className="App">
        <Toolbar
          className="App__Toolbar"
          progress={this.exercise.isStarted ? this.exercise.progress : null}
          text={
            this.exercise.isStarted
              ? null
              : "Excercise is loaded. Start typing whenever ready"
          }
          levels={this.props.tutor.levels}
          currentLevel={this.props.tutor.currentLevel}
          onLevelChange={this.handleLevelChange}
          onSkip={this.handleSkip}
        />
        <TextToType
          className="App__TextToType"
          text={this.exercise.textToType}
          errorsIndexes={this.exercise.errorsIndexes}
          cursorIndex={this.exercise.index}
        />
        <Keyboard
          className="App__Keyboard"
          layout={layouts.qwerty}
          highlightKeys={this.exercise.activeKeys}
        />
      </div>
    );
  }

  get exercise() {
    if (!this.currentExercise || this.currentExercise.isOver) {
      this.currentExercise = this.props.tutor.getNextExercise(
        this.currentExercise
      );
    }
    return this.currentExercise;
  }

  public componentWillMount() {
    document.addEventListener("keydown", this.onKeyDown);
  }

  public onKeyDown(event: KeyboardEvent) {
    if (event.ctrlKey || event.altKey || event.metaKey) {
      return;
    }
    const result = this.exercise.tryChar(event.key);
    if (result === undefined) {
      return;
    }
    this.playSound(result);
    this.forceUpdate();
  }

  public handleLevelChange(newLevel: number) {
    this.props.tutor.currentLevel = newLevel;
    this.currentExercise = null;
    this.forceUpdate();
  }

  public handleSkip() {
    this.currentExercise = null;
    this.forceUpdate();
  }

  public playSound(isCorrect: boolean) {
    const path = soundPaths[isCorrect ? "keystroke" : "error"];
    new Audio(path).play();
  }
}

export default App;
