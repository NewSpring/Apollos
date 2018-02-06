import fetch from 'isomorphic-fetch';
import { compose, withProps } from 'recompose';
import Settings from '@utils/Settings';
import ImagePicker from '@ui/ImagePicker';
import withUser from '@data/withUser';

const UploadProfileImageForm = compose(
  withUser,
  withProps(props => ({
    onSelectFile: async (e) => {
      try {
        const { files } = e.currentTarget;
        if (!Settings.ROCK_PUBLIC_TOKEN || !Settings.ROCK_URL) throw new Error('Project is not setup to receive profile images');

        const data = new FormData();
        data.append('file', files[0]);

        const id = await fetch(`${Settings.ROCK_URL}api/BinaryFiles/Upload?binaryFileTypeId=5`, {
          method: 'POST',
          headers: {
            'Authorization-Token': Settings.ROCK_PUBLIC_TOKEN,
          },
          body: data,
        }).then(res => res.json());

        await props.attachPhotoIdToUser({
          id,
        });

        return true;
      } catch (err) {
        throw err;
      }
    },
  })),
)(ImagePicker);

export default UploadProfileImageForm;
