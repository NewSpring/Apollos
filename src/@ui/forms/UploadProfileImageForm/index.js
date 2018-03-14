import { compose, withProps, withState } from 'recompose';

import Settings from '@utils/Settings';
import ImagePicker from '@ui/ImagePicker';
import withUser from '@data/withUser';
import fetch from '@utils/fetch';
import sentry from '@utils/sentry';

const UploadProfileImageForm = compose(
  withUser,
  withState('isUploadingFile', 'setIsUploadingFile', false),
  withProps(props => ({
    onSelectFile: async (file) => {
      try {
        if (!Settings.APP_ROCK_PUBLIC_TOKEN || !Settings.APP_ROCK_URL) throw new Error('Project is not setup to receive profile images');

        const data = new FormData();
        data.append('file', file);

        props.setIsUploadingFile(true);
        const res = await fetch(`${Settings.APP_ROCK_URL}api/BinaryFiles/Upload?binaryFileTypeId=5`, {
          method: 'POST',
          headers: {
            'Authorization-Token': Settings.APP_ROCK_PUBLIC_TOKEN,
          },
          body: data,
        });

        const id = await res.json();

        await props.attachPhotoIdToUser({
          id,
        });
        props.setIsUploadingFile(false);

        // NOTE: Refetch user to update current user state
        // and trigger any necessary rerenders
        // (not tested yet @burke)
        await props.refetch();

        return true;
      } catch (err) {
        sentry.captureException(err);
        throw err;
      }
    },
  })),
)(ImagePicker);

export default UploadProfileImageForm;
