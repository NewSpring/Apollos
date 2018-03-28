import { compose, withProps, setPropTypes } from 'recompose';
import PropTypes from 'prop-types';

import Settings from '@utils/Settings';
import ImagePicker from '@ui/ImagePicker';
import withUser from '@data/withUser';
import fetch from '@utils/fetch';
import sentry from '@utils/sentry';

const UploadProfileImageForm = compose(
  setPropTypes({
    onUploadStarted: PropTypes.func,
    onUploadEnded: PropTypes.func,
  }),
  withUser,
  withProps(props => ({
    onSelectFile: async (file) => {
      try {
        if (!Settings.APP_ROCK_PUBLIC_TOKEN || !Settings.APP_ROCK_URL) {
          throw new Error('Project is not setup to receive profile images');
        }

        const data = new FormData();
        data.append('file', file);

        if (props.onUploadStarted) {
          props.onUploadStarted();
        }

        const res = await fetch(
          `${Settings.APP_ROCK_URL}api/BinaryFiles/Upload?binaryFileTypeId=5`,
          {
            method: 'POST',
            headers: {
              'Authorization-Token': Settings.APP_ROCK_PUBLIC_TOKEN,
            },
            body: data,
          },
        );

        const id = await res.json();

        await props.attachPhotoIdToUser({
          id,
        });

        if (props.onUploadEnded) {
          props.onUploadEnded();
        }

        // NOTE: Refetch user to update current user state
        // and trigger any necessary rerenders
        props.refetch();

        return true;
      } catch (err) {
        sentry.captureException(err);
        throw err;
      }
    },
  })),
)(ImagePicker);

export default UploadProfileImageForm;
