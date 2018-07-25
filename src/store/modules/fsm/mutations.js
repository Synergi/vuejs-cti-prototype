// fsm/mutations
import { transitions, key as STORAGE_KEY } from "./transitions";
import { format } from "date-fns";
import { Enum } from "enumify";

class AppStates extends Enum {
  static props(stateName, label) {
    return {
      get state() {
        return stateName;
      },
      get label() {
        return label;
      }
    };
  }
}

// states are mapped to api state, and front end label.
AppStates.initEnum({
  OFF_PHONE: AppStates.props("offPhone", "Connection"),
  READY: AppStates.props("Available", "Ready"),
  PAUSED: AppStates.props("Paused", "Paused"),
  DIALLING: AppStates.props("dialling", "Dialling"),
  ON_CALL: AppStates.props("onCall", "On call"),
  MANUAL_CALL: AppStates.props("manualCall", "On call"),
  CALL_FAILED: AppStates.props("callFailed", "Call failed"),
  HOLD: AppStates.props("hold", "On hold"),
  WRAP: AppStates.props("wrap", "On wrap"),
  MANUAL_PREVIEW: AppStates.props("manualPreview", "Preview"),
  OUTBOUND_PREVIEW: AppStates.props("Preview", "Preview"),
  OUTBOUND_CALL: AppStates.props("onCall", "On Call"),
  OUTBOUND_WRAP: AppStates.props("wrap", "On Wrap")
});

const readableState = state => {
  switch (state.currentState) {
    case "offPhone":
      return AppStates.OFF_PHONE.label;
    case "onPhonePaused":
      return AppStates.PAUSED.label;
    case "onPhoneAvailable":
      return AppStates.READY.label;
    case "onPhoneLine1ManCallDialling":
    case "onPhoneAvailableOnLine1UnallocManCallDialling":
    case "onPhonePausedOnLine1UnallocManCallDialling":
    case "onPhoneLine1OutboundCallDialling":
      return AppStates.DIALLING.label;
    case "onPhoneLine1InboundCall":
    case "onPhoneAvailableOnLine1UnallocManCall":
    case "onPhonePausedOnLine1UnallocManCall":
      return AppStates.ON_CALL.label;
    case "onPhoneLine1ManCallFailed":
    case "onPhoneAvailableOnLine1UnallocManCallFailed":
    case "onPhonePausedOnLine1UnallocManCallFailed":
    case "onPhoneLine1OutboundCallFailed":
      return AppStates.CALL_FAILED.label;
    case "onPhoneLine1ManCall":
      return AppStates.MANUAL_CALL.label;
    case "onPhoneLine1ManCallHold":
    case "onPhoneLine1InboundHold":
    case "onPhoneLine1OutboundHold":
      return AppStates.HOLD.label;
    case "onPhoneWrapping":
      return AppStates.WRAP.label;
    case "onManualPreview":
      return AppStates.MANUAL_PREVIEW.label;
    case "onOutboundPreview":
      return AppStates.OUTBOUND_PREVIEW.label;
    case "onPhoneLine1OutboundCall":
      return AppStates.OUTBOUND_CALL.label;
    case "onOutboundWrapping":
      return AppStates.OUTBOUND_WRAP.label;
    default:
      return false;
  }
};

const updatePersistentState = (state, target, value) => {
  state[target] = value;
  const val = typeof value !== "string" ? JSON.stringify(value) : value;
  window.localStorage.setItem(`${STORAGE_KEY}.${target}`, val);
};

const TRANSITION = (state, param) => {
  try {
    transitions.forEach(transition => {
      if (transition.name === param) {
        const fromArr = transition.from;
        fromArr.forEach(origin => {
          if (state.currentState === origin) {
            // if transition is possible
            updatePersistentState(
              state,
              "previousStateDt",
              state.currentStateDt || 0
            );
            updatePersistentState(state, "currentState", transition.to);
            updatePersistentState(
              state,
              "currentStateDt",
              format(new Date(), "x")
            );
            updatePersistentState(state, "previousState", origin);
            const appState = readableState(state);
            updatePersistentState(state, "appState", appState);
          }
          return state.currentState;
        });
      }
    });
  } catch (error) {
    // eslint-disable-next-line
    console.log(">>>>>> ERROR <<<<<<", error);
  }
};

const APP_STATE = state => {
  return state.appState;
};

const CURRENT_STATE = state => {
  return state.currentState;
};

const PREVIOUS_STATE = state => {
  return state.previousState;
};

export default {
  TRANSITION,
  APP_STATE,
  CURRENT_STATE,
  PREVIOUS_STATE
};
