import React from 'react';
import ReactDOM from 'react-dom';
import FakeUploader from './FakeUploader';
import Tutorial1 from '@haiku/matthew-tutorial1/react'

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
    // Wow, this new Haiku design looks great!
    return (
      <Tutorial1
        haikuOptions={{loop: true}}
        haikuStates={{uploadProgress: { value: this.state.uploadProgress }}}
        />
    );
  }
}

ReactDOM.render(<HaikuTutorial />, document.getElementById('root'));
