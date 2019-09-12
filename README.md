# Apply Regex Validation PCF (PowerApps Component Framework)
Apply Regex Validation custom control is the Regex based field validation for text fields.

# Usage Instructions
1. Download the latest version of solution from [releases](https://github.com/rameelkhan/Apply-Regex-Validation/releases) section
2. Import the solution to your Dynamics CRM instance
3. Open the desired Form Editor for the required entity, select the field supported by this control *(SingleLine.Text, SingleLine.Phone, SingleLine.Email)* and click *"Change Properties"* and then select the *"Controls"* tab.
4. In the Controls tab, click the *"Add Control..."* button, select *"Apply Regex Validation"* in the list of available controls and click *"Add"*.\
![Add Custom Control](https://github.com/rameelkhan/Apply-Regex-Validation/blob/master/ReadMeImages/Adding_Custom_Control.PNG?raw=true, "Add Custom Control")
5. Select the types of client for which this control will be used.
6. Property *"Input Text"* will be selected by default.
7. Insert the Regex which you want to apply to the field for validation in the mandatory *"Regex Expression"* property.
![Final Control Layout](https://github.com/rameelkhan/Apply-Regex-Validation/blob/master/ReadMeImages/Final_Control_Layout.PNG?raw=true, "Final Control Layout")
8. Insert the message which you want to show the user in the *"Field Notification"* property.
9. If *"Field Notification"* property is left empty, default message will be *"Incorrect Format"*.
![Field Notification](https://github.com/rameelkhan/Apply-Regex-Validation/blob/master/ReadMeImages/Field_Notification.PNG?raw=true, "Field Notification")
10. Save settings of the custom control, save and publish the entity form.


# Control Behaviour:
1. On change of field value, if the value in the field doesn't satisfies the Regex, notification will be on field.\
![Error Message on field change](https://github.com/rameelkhan/Apply-Regex-Validation/blob/master/ReadMeImages/Error_Message_On_Field_Change.PNG?raw=true, "Error Message on field change")
2. On Save of Record, if the value in the field doesn't satisfies the Regex, notification will be on field as well on top of form (OOB behaviour).\
![Error Message on Save](https://github.com/rameelkhan/Apply-Regex-Validation/blob/master/ReadMeImages/Error_Message_On_Save.PNG?raw=true, "Error Message on Save")

# References:
- https://docs.microsoft.com/en-us/powerapps/developer/component-framework/implementing-controls-using-typescript
- https://www.itaintboring.com/dynamics-crm/pcf-controls-now-i-have-my-first-pcf-control-too/
- https://debajmecrm.com/2019/05/04/what-does-context-object-hold-in-power-apps-custom-component-framework-organization-info-user-info-web-api-methods-and-more/
- https://www.tutorialspoint.com/typescript/typescript_variables.htm
