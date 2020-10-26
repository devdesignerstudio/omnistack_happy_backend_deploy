import Orphanage from '../models/Orphanage';
import ImagesView from './images';

export default {
    render(orphanage: Orphanage) {
        return {
            id: orphanage.id,
            name: orphanage.name,
            latitude: Number(orphanage.latitude),
            longitude: Number(orphanage.longitude),
            about: orphanage.about,
            instructions: orphanage.instructions,
            opening_hours: orphanage.opening_hours,
            open_on_weekends: orphanage.open_on_weekends,
            images: ImagesView.renderMany(orphanage.images),
            contact: orphanage.contact
        };
    },

    renderMany(orphanages: Orphanage[]){
        return orphanages.map(orphanage => this.render(orphanage));
    }
}