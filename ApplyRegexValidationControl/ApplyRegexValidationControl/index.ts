import {IInputs, IOutputs} from "./generated/ManifestTypes";

export class ApplyRegexValidationControl implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	/**
	 * PCF framework delegate which will be assigned to this object which would be 
	 * called whenever any update happens.
	 */
	private _notifyOutputChanged: () => void;

	/** Reference to ComponentFramework Context object */
	private objContext: ComponentFramework.Context<IInputs>;

	/** Event Handler 'refreshData' reference */
	private objRefreshData: EventListenerOrEventListenerObject;
	
	/**
	 * Reference to the control container HTMLDivElement
	 * This element will contain all elements of our custom control which will be
	 * appended to the actual container of the control available for "init" method
	 */
	private  objContainer: HTMLDivElement;

	/**Input Element of the Custom Control */
	private objInputElement: HTMLInputElement;

	/**Value of the field from control is stored and used inside custom control */
	private sInputValueToProcess: string;
	/**Regex from Property as Config is stored here */
	private objRegexToProcess: RegExp;
	/**Notification from Property as Config is stored here */
	private sNotificationToUser: string;

	/** Static Variables */
	public sDefaultLabel = "";
	public sDefaultErrorLabel = "Incorrect Format";
	public sDivElementClass: string = "classDiv";
	public sDivElementId: string = "sDivId";
	public sInputElementClass: string = "classInput";
	public sInputElementId: string = "sInputId";
	public sLabelElementClass: string = "classLabel";
	public sLabelElementId: string = "sLabelId";
	public sErrorLabelElementClass: string = "classErrorLabel";
	public sErrorLabelElementId: string = "sErrorLabelId";

	/**Empty constructor */
	constructor()
	{

	}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param objActualContainer If a control is marked control-type='starndard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, 
	state: ComponentFramework.Dictionary, objActualContainer:HTMLDivElement)
	{
		var sInputValue = ""; // Default Input Value for Text Input & Label Element

		this.objContext = context;
		this._notifyOutputChanged = notifyOutputChanged;
		this.objRefreshData = this.refreshData.bind(this);

		this.objContainer = document.createElement("div");

		this.objInputElement = document.createElement("input");
		this.objInputElement.setAttribute("type", "text");
		this.objInputElement.setAttribute("id", this.sInputElementId);
		this.objInputElement.setAttribute("class", this.sInputElementClass);
		this.objInputElement.addEventListener("input", this.objRefreshData);

		if(this.isValid(context.parameters.textValueToProcess))
		{
			this.sInputValueToProcess = context.parameters.textValueToProcess.raw;
			sInputValue = context.parameters.textValueToProcess.formatted ?
				context.parameters.textValueToProcess.formatted : "";
		}
		
		if(this.isValid(context.parameters.regexExpressionToProcess))
		{
			this.objRegexToProcess = 
				new RegExp(context.parameters.regexExpressionToProcess.raw);
		}
		
		if(this.isValid(context.parameters.notificationToUser))
		{
			this.sNotificationToUser = context.parameters.notificationToUser.raw;
		}

		// Set the control value on initialization
		this.objInputElement.setAttribute("value", sInputValue);
				
		//this.processForRegex(sInputValue as string);//Needed to run only on load of Control/Form

		// appending the HTML elements to the custom control's HTML container element
		this.objContainer.appendChild(this.objInputElement);
		
		// Append the custom control Container - "objContainer" to
		// the Actual Control Container "objActualContainer
		objActualContainer.appendChild(this.objContainer);
	}

	/**
	 * Called when any value in the property bag has changed. 
	 * This includes field values, data-sets, global values such as container height and width, 
	 * offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; 
	 * It contains values as set up by the customizer mapped to names defined in the manifest, 
	 * as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		// storing the latest context from the control
		this.objContext = context;
	}

	/**
	 * Called when any value change occurs in Input Element TextBox
	 * @param objEvent
	 */
	public refreshData(objEvent: Event): void
	{
		// Read the value of Input Element
		this.sInputValueToProcess = (this.objInputElement.value as any) as string;
		this.processForRegex(this.sInputValueToProcess);
		this._notifyOutputChanged();
	}

	public processForRegex(sValueToProcess: string): void
	{		
		var sNotification = this.isValid(this.sNotificationToUser) ?
			this.sNotificationToUser : this.sDefaultErrorLabel;
		var sUniqueId = sNotification + "_UniqueId";

		var objClearNotification = null;
		var objSetNotification = null;
		
		objClearNotification = this.GetFunctionFromContextUtils("clearNotification");
		objSetNotification = this.GetFunctionFromContextUtils("setNotification");		
		if(this.isValid(objClearNotification) && this.isValid(objSetNotification))
		{
			objClearNotification = objClearNotification as Function;
			objSetNotification = objSetNotification as Function;
			if(this.isValid(this.objRegexToProcess) && this.isValid(sValueToProcess) &&
			  !this.objRegexToProcess.test(sValueToProcess))
			{
				//setNotification(message,uniqueId)
				objSetNotification(sNotification, sUniqueId);
			}
			else
			{
				//clearNotification(uniqueId)
				objClearNotification(sUniqueId);
			}
		}
	}

	public GetFunctionFromContextUtils(sFunctionName: string): Function | null
	{
		var objFunctionToReturn = null;
		
		if(this.isValid(this.objContext) && this.isValid(this.objContext.utils) &&
		   this.isValid((this.objContext.utils as any)[sFunctionName]))
		{
			objFunctionToReturn = (this.objContext.utils as any)[sFunctionName] as Function;
		}
		
		return objFunctionToReturn;
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, 
	 * expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		return { textValueToProcess: this.sInputValueToProcess };
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. 
	 * Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		this.objInputElement.removeEventListener("input", this.objRefreshData);
	}

	public isValid(objectToProcess: any): boolean
	{
		var bIsObjectValid: boolean = false;
		if(objectToProcess != null && objectToProcess !== "" &&
			objectToProcess != undefined && objectToProcess !== "undefined")
		{
			bIsObjectValid = true;
		}
		return bIsObjectValid;
	}
}