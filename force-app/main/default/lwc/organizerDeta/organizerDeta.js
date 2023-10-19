import { LightningElement ,wire,track} from 'lwc';
import getOrganizer from '@salesforce/apex/Organizer.getOrganizer';
import ICON_IMAGE from '@salesforce/resourceUrl/background';
import YOUTUBE_IMAGE from '@salesforce/resourceUrl/youtube';
import BLOG_IMAGE from '@salesforce/resourceUrl/logopic';
import TRAIL_IMAGE from '@salesforce/resourceUrl/trailhead';
export default class OrganizerDeta extends LightningElement {
    background=ICON_IMAGE;
    youtube=YOUTUBE_IMAGE;
    logopic=BLOG_IMAGE;
    trailhead=TRAIL_IMAGE;
 @track contacts;

    @wire(getOrganizer)
    wiredContacts({ error, data }) {
        if (data) {
            this.contacts = data;
        } else if (error) {
            console.error('Error retrieving contacts', error);
        }
    }
}