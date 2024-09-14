import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ToolsService {

    constructor() { }

    Base64PopUp(base64 : string, filename : string): void{
        //┌───────────────────────────────────────────────────────────┐
        //│ Usage: "data:text/plain;base64,[Base64]", "File.txt"      │
        //└───────────────────────────────────────────────────────────┘

        var byteCharacters = atob(base64.split(`,`)[1] );
        var byteNumbers = new Array(byteCharacters.length);
        for (var i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        var byteArray = new Uint8Array(byteNumbers);
        var file = new Blob([byteArray], { type: base64.split(',')[0] });
        var fileURL = URL.createObjectURL(file);
        
        const linkElement = document.createElement("a");
        linkElement.setAttribute("href", fileURL);
        linkElement.setAttribute("target", "_blank");
        linkElement.setAttribute("download", filename);
  
        let me = new MouseEvent("click", {
            view: window,
            bubbles: true,
            cancelable: false,
        });

        linkElement.dispatchEvent(me);
    }

    Base64toFile(base64 : string, filename : string) : File{
        var arr = base64.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        
        return new File([u8arr], filename, {type:mime});
    }

    ByteArrToBase64(buffer) {
        var binary = '';
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode( bytes[ i ] );
        }
        return window.btoa(binary);
    }

    Base64ToBlob(base64 : string): Blob{
        //┌───────────────────────────────────────────────────────────┐
        //│ Usage: "data:text/plain;base64,[Base64]", "File.txt"      │
        //└───────────────────────────────────────────────────────────┘

        var byteCharacters = atob(base64.split(`,`)[1] );
        var byteNumbers = new Array(byteCharacters.length);
        for (var i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        var byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: base64.split(',')[0] });
    }

    /**
     * @param DateStr - Date on ISO format, e.g: 
     * [ 2010-10-05T14:48:00.000Z ]
     * @returns Date on format DD/MM/YYYY
    */
    DateISOToDDMMYYYY(DateStr: string): string{
        var res = new Date(DateStr).toISOString().replace(/T.*/,'').split('-').reverse().join('/');
        return res;
    }

    /**
     * @param DateStr - DD/MM/YYYY
     * @returns Date on format [ 2010-10-05T14:48:00.000Z ]
    */
    DateDDMMYYYYToIsoFormat(DateStr: string): string{
        var [d, m, y] = DateStr.split('/')
        var day   = Number.parseInt(d);
        var month = Number.parseInt(m) - 1;
        var year  = Number.parseInt(y);
        var res = new Date(year, month, day).toISOString();
        return res;
    }

    /**
     * @param DateStr - DD/MM/YYYY
     * @returns Date on Date Object Date()
    */
    DateDDMMYYYYToDateObject(DateStr: string): Date{
        var [d, m, y] = DateStr.split('/')
        var day   = Number.parseInt(d);
        var month = Number.parseInt(m) - 1;
        var year  = Number.parseInt(y);
        var res = new Date(year, month, day);
        return res;
    }

    /**
     * @param DateStr - 2010-10-05T14:48:00.000Z 
     * @returns Date on format [ YYYY-MM-DD ]
    */
    DateIsoFormatToYYYYMMDD(DateStr: string): string{
        var res = new Date(DateStr).toISOString().replace(/T.*/,'').split('-').join('-');
        return res;
    }

    /**
     * @param DateStr - 2022-02-03
     * @returns Date on format [ 03/02/2022 ]
    */
    DateYYYYMMDDToDDMMYYY(DateStr: string): string{
        var dates = DateStr.split('-')
        return dates[2] + '/' + dates[1] + '/' + dates[0];
    }
}