import { Injectable } from '@angular/core';
import { StringDecoder } from 'string_decoder';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  imgBase64 : string;
  constructor() { }

  convertToBase64(fileInput: any){
    if (fileInput.target.files && fileInput.target.files[0]) {
        const max_size = 20971520;
        const allowed_types = ['image/png', 'image/jpeg', 'image/jpg'];
        const max_height = 15200;
        const max_width = 25600;

        // if (fileInput.target.files[0].size > max_size) {
        //     this.imageError =
        //         'Maximo tamanho permitido ' + max_size / 1000 + 'Mb';

        //     return false;
        // }

        // if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
        //     this.imageError = 'Tipos de Imagens permitido ( JPG | PNG )';
        //     return false;
        // }
        
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const image = new Image();
            image.src = e.target.result;
            image.onload = rs => {
                this.imgBase64 = e.target.result;
                    
        
            };
        };

        reader.readAsDataURL(fileInput.target.files[0]);

        return this.imgBase64;
    }
}

}
