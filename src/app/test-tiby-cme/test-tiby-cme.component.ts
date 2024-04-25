import { Component } from '@angular/core';
import { EditorModule } from '@tinymce/tinymce-angular';

@Component({
  selector: 'app-test-tiby-cme',
  standalone: true,
  imports: [
    EditorModule,
  ],
  templateUrl: './test-tiby-cme.component.html',
  styleUrl: './test-tiby-cme.component.css'
})
export class TestTibyCMEComponent {
  title = 'test TinyCME';

  editorConfig = {
    base_url: '/tinymce',
    suffix: '.min',
    plugins: 'lists link image table code help wordcount',
    menubar: true,
    toolbar: true,
    min_height: 10
  }
}
