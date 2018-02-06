import { compose, withProps } from 'recompose';
import Settings from '@utils/Settings';
import ImagePicker from '@ui/ImagePicker';
import withUser from '@data/withUser';
import fetch from '@utils/fetch';

const UploadProfileImageForm = compose(
  withUser,
  withProps(props => ({
    onSelectFile: async (file) => {
      // console.log({ file });
      try {
        if (!Settings.ROCK_PUBLIC_TOKEN || !Settings.ROCK_URL) throw new Error('Project is not setup to receive profile images');

        const data = new FormData();
        data.append('file', file);

        const res = await fetch(`${Settings.ROCK_URL}api/BinaryFiles/Upload?binaryFileTypeId=5`, {
          method: 'POST',
          headers: {
            'Authorization-Token': Settings.ROCK_PUBLIC_TOKEN,
          },
          body: data,
        });
        // console.log({ res });
        const id = JSON.parse(res);

        await props.attachPhotoIdToUser({
          id,
        });

        return true;
      } catch (err) {
        // console.log(err);
        throw err;
      }
    },
  })),
)(ImagePicker);

export default UploadProfileImageForm;
