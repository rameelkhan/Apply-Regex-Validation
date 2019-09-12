/*
*This is auto generated from the ControlManifest.Input.xml file
*/

// Define IInputs and IOutputs Type. They should match with ControlManifest.
export interface IInputs {
    textValueToProcess: ComponentFramework.PropertyTypes.StringProperty;
    regexExpressionToProcess: ComponentFramework.PropertyTypes.StringProperty;
    notificationToUser: ComponentFramework.PropertyTypes.StringProperty;
}
export interface IOutputs {
    textValueToProcess?: string;
}
