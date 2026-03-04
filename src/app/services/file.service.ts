import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { tap, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

interface File {
  originalName: string;
  filename: string;
  location: string
}


@Injectable({
  providedIn: 'root',
})
export class FileService {

  private urlApi = `${environment.API_URL}/api/v1/files`;
  constructor(
    private _http: HttpClient
  ){}

  getFile(name: string, url: string, type: string) {
    return this._http.get(url, {responseType: 'blob'})
    .pipe(
      tap(context => {
        const blob = new Blob([context], {type});
        saveAs(blob, name);
      }),
      map(() => true)
    );
  }

  uploadFile(file: Blob) {
    const dto = new FormData();
    dto.append('file', file);
    return this._http.post<File>(`${this.urlApi}/upload`, dto, {
      // headers: {
      //   'Content-type': "multipart/form-data"
      // }
    })
  }
}
