/*
    @Description        : This Apex class provides functionality to update survey responses on Contact records
							and retrieve Contacts who have completed the survey.
    @Author             : Sprutiraj
    @Last Modified By   : Sprutiraj
    @Last Modified On   : 18-10-2023
    @Modification Log   :
    Ver       Date            Author          Modification
    1.0    18-10-2023       Sprutiraj        Initial Version
*/
public class ContactController {
    /**
     * @Description: Updates the survey response of a Contact record.
     * @param recordId - The unique identifier of the Contact record.
     * @param response - The survey response to be added to the Contact record.
     * @return A message indicating the result of the update operation.
     */
 @AuraEnabled(Cacheable = false)
    public static string updateContactResponse(String recordId,String response) {       
        try{
        Contact con = new Contact();
        con.Id = recordId;
        con.Survey_Response__c = 'your Dietary Preference is :'+response;
        upsert con;
        }
        catch(Exception e){
            System.debug('Message>>>>'+e);
        }
        return 'something';
            //}
        
    }
     /**
     * @Description: Retrieves Contacts with a green flag (completed survey).
     * @return A list of Contact records with completed surveys.
     */
     @AuraEnabled(cacheable = true)
    public static List<Contact> getGreenFlagContacts() {
        List<Contact> greenFlagContacts = new List<Contact>();
        // Query for Contacts with a green flag (Survey_Response__c is not blank or equals '🟢 Green Flag')
        greenFlagContacts = [SELECT Id, Name, Survey_Response__c,Flag__c FROM Contact WHERE Survey_Response__c != '' AND Flag__c = '🟢 Completed'];
        return greenFlagContacts;
    }
}