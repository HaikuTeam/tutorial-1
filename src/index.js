import React from 'react';
import ReactDOM from 'react-dom';
import FakeUploader from './FakeUploader';

class HaikuTutorial extends React.Component {
  constructor (props) {
    super(props);
    this.uploader = new FakeUploader('some_file.jpg');
    this.state = { uploadProgress: 0.0 };
  }

  componentDidMount () {
    this.uploader.on('progress', (uploadProgress) => {
      console.info('Upload progress:', uploadProgress)
      this.setState({ uploadProgress });
    })

    this.uploader.on('finished', () => {
      console.info('Upload finished!')
      this.setState({ uploadProgress: 1.0 })
    })

    setTimeout(() => {
      this.uploader.upload();
    }, 1000)
  }

  render () {
    // Gee, this seems kind of boring. Perhaps a designer can spice it up?
    return (
      <div>{this.state.uploadProgress}</div>
    );
  }
}

ReactDOM.render(<HaikuTutorial />, document.getElementById('root'));
