import { LightningElement,api,track,wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { getRecord } from 'lightning/uiRecordApi';
import { updateRecord } from 'lightning/uiRecordApi';
import { getFieldValue } from 'lightning/uiRecordApi';
const FIELDS = ['Contact.Name'];
export default class Ldsdata extends LightningElement {
@track contactName;
    @api recordId;
    @track selectedOption = null;
 get options() {
        return [
            { label: 'Vegetarian', value: 'Vegetarian' },
            { label: 'Non-vegetarian', value: 'Non-vegetarian' },
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
    if (this.contactName && this.recordId && this.selectedOption) {
        const fields = {};
        fields.Id = this.recordId;
        fields.Survey_Response__c = this.selectedOption;

        const recordInput = { fields };

        // Debugging: Log the recordInput to see if the data is correct
        console.log('recordInput:', recordInput);

        updateRecord(recordInput)
            .then(() => {
                this.showToast('Success', 'Survey Response Updated', 'success');
            })
            .catch(error => {
                console.error('Error updating record', error);
                this.showToast('Error', 'Failed to Update Survey Response', 'error');
            });
    } else {
        console.error('Missing required data. Contact Name:', this.contactName, 'Record Id:', this.recordId, 'Selected Option:', this.selectedOption);
    }
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