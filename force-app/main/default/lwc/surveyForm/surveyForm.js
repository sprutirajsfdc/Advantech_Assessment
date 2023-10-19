import { LightningElement, wire,api,track} from 'lwc';
import updateContactResponse from '@salesforce/apex/ContactController.updateContactResponse';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const FIELDS = ['Contact.Name'];
export default class SurveyForm extends LightningElement {
 @track contactName;
  @api recordId;
   value = '';
    @ track selectedOption=null;

    get options() {
        return [
            { label: 'Vegetarian', value: 'Vegetarian' },
            { label: 'Non-vegetarian.', value: 'Non-vegetarian' },
        ];
    }

  @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    contactRecord({ error, data }) {
        if (data) {
            this.contactName = getFieldValue(data, 'Contact.Name');
        } else if (error) {
            console.error('Error loading contact data', error);
        }
    }


    handleOptionChange(event) {
        this.selectedOption = event.detail.value;
    }
    
     handleSubmit() {
       updateContactResponse({recordId:this.recordId,response:this.selectedOption})
        .then(result =>{
            console.log(result);
            console.log('Recoedidd',this.recordId);
            console.log('Selectedoption',this.selectedOption);
            this.showToast('Success', 'Survey Response Updated', 'success');
            

        }).catch(error =>{
                console.log('uda>>>>>>'+updateContactResponse);
                 console.log('Error is',error);
                  this.showToast('Error', 'Failed to Update Survey Response', 'error');
        });
     }
       showToast(title, message, variant) {
        const toastEvent = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(toastEvent);
    }
}