class MyUploadAdapter {
  private props: AdapterProps
  private loader: any
  private xhr: XMLHttpRequest

  constructor(loader: any, props: AdapterProps) {
    // The file loader instance to use during the upload.
    this.loader = loader;
    this.props = props;
  }

  // Starts the upload process.
  upload() {
    return this.loader.file
      .then((file: any) => new Promise((resolve, reject) => {
        this._initRequest();
        this._initListeners(resolve, reject, file);
        this._sendRequest(file);
      }));
  }

  abort() {
    if (this.xhr) {
      this.xhr.abort();
    }
  }

  _initRequest() {
    const xhr = this.xhr = new XMLHttpRequest();

    xhr.open('POST', '/api/upload', true);
    xhr.setRequestHeader("Authorization", "Bearer " + this.props.secret);
    xhr.responseType = 'json';
  }

  // Initializes XMLHttpRequest listeners.
  _initListeners(resolve, reject, file) {
    const xhr = this.xhr;
    const loader = this.loader;
    const genericErrorText = `Couldn't upload file: ${file.name}.`;
    xhr.addEventListener('error', () => reject(genericErrorText));
    xhr.addEventListener('abort', () => reject());
    xhr.addEventListener('load', () => {
      const response = xhr.response;
      if (!response || response.error) {
        return reject(response && response.error ? response.error.message : genericErrorText);
      }

      resolve({
        default: response[0]?.url
      });
    });

    if (xhr.upload) {
      xhr.upload.addEventListener('progress', evt => {
        if (evt.lengthComputable) {
          loader.uploadTotal = evt.total;
          loader.uploaded = evt.loaded;
        }
      });
    }
  }

  // Prepares the data and sends the request.
  _sendRequest(file) {
    // Prepare the form data.
    const data = new FormData();
    data.append('files', file);
    // Send the request.
    this.xhr.send(data);
  }
}


type AdapterProps = {
  secret: string
}

const MyCustomUploadAdapterPlugin = (props: AdapterProps) => {
  return (editor: any) => {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
      // Configure the URL to the upload script in your back-end here!
      return new MyUploadAdapter(loader, props);
    };
  }
}

type Props = {
  secret: string
  element: Element
  toolbar?: string[]
}

export default function initEditor (ClassicEditor: any, props: Props): Promise<any> {
  if (ClassicEditor) {
    return ClassicEditor
      .create(props.element, {
        extraPlugins: [MyCustomUploadAdapterPlugin({ secret: props.secret })],
        licenseKey: '',
        heading: {
          options: [
            { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
            { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
            { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' }
          ]
        },
        toolbar: props.toolbar || [
          'paragraph',
          'heading1',
          'heading2',
          '|',
          'bold',
          'italic',
          'underline',
          'link',
          'bulletedList',
          'numberedList',
          '|',
          'outdent',
          'indent',
          '|',
          'codeBlock',
          'highlight',
          // 'imageUpload',
          'imageInsert',
          'blockQuote',
          'insertTable',
          'mediaEmbed',
          'undo',
          'redo'
        ],
        language: 'vi'
      })
  }
  else {
    return Promise.reject("Invalid ClassicEditor")
  }
}