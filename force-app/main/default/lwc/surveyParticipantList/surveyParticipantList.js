import { LightningElement,track,wire } from 'lwc';
import getGreenFlagContacts from '@salesforce/apex/ContactController.getGreenFlagContacts';

export default class SurveyParticipantList extends LightningElement {

@track columns = [
          { label: 'Name', fieldName: 'Name' },
          { label: 'Survery Status', fieldName: 'Flag__c'}
      ];
     @track ContactList;

     @wire (getGreenFlagContacts) wiredContacts({data,error}){
          if (data) {
               this.ContactList = data;
          console.log(data); 
          } else if (error) {
          console.log(error);
          }
     }
     
}