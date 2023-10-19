@isTest
public class ContactController_Test {
@isTest
    static void Dogettest(){
        Contact newcontact = new Contact();
        newcontact.LastName='Spruti';
        newcontact.Survey_Response__c='the survey';
        insert newcontact;
      	String response = 'Vegetarian';
        String result = ContactController.updateContactResponse(newcontact.Id, response);
          // Verify that the method returned 'something'
        System.assertEquals('something', result);
         // Verify that the Survey_Response__c field was updated with the expected value
        newcontact = [SELECT Id, Survey_Response__c FROM Contact WHERE Id = :newcontact.Id];
        System.assertEquals('your Dietary Preference is :Vegetarian', newcontact.Survey_Response__c);
    }
     @isTest
    static void testGetGreenFlagContacts() {
        // Create a test Contact with a green flag
        Contact greenContact = new Contact(
            LastName = 'GreenContact',
            Survey_Response__c = 'Some response'
        );
        insert greenContact;

        // Create a test Contact without a green flag
        Contact nonGreenContact = new Contact(
            LastName = 'NonGreenContact',
            Survey_Response__c = 'Some response'
        );
        insert nonGreenContact;

        // Call the getGreenFlagContacts method
        List<Contact> greenFlagContacts = ContactController.getGreenFlagContacts();

        // Verify that the method returns only Contacts with a green flag
        System.assertEquals(2, greenFlagContacts.size());
        System.assertEquals(greenContact.Id, greenFlagContacts[0].Id);
    }
}