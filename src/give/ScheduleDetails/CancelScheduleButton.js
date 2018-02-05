import { compose, withProps, withState } from 'recompose';
import withCancelSchedule from '@data/withCancelSchedule';
import Button from '@ui/Button';

const enhance = compose(
  withState('loading', 'setIsLoading'),
  withCancelSchedule,
  withProps(props => ({
    async onPress() {
      try {
        props.setIsLoading(true);
        if (!props.id) throw new Error('id missing from Button component');
        await props.cancelSchedule(props.id);
        props.setIsLoading(false);
      } catch (err) {
        throw err;
      }
    },
    bordered: true,
    type: 'alert',
    title: 'Cancel Schedule',
  })),
);

export default enhance(Button);
