public class Organizer {
    @AuraEnabled(cacheable = true)
    public static List<Contact> getOrganizer(){
         List<Contact> getOrgaContacts = new List<Contact>();
        getOrgaContacts = [SELECT Id, Name, Phone, Email, Title, Department FROM Contact Where Name ='Sprutiraj Panda'];
        return getOrgaContacts;
    }
}