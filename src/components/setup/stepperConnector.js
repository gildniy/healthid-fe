import { withStyles } from '@material-ui/core/styles';
import StepConnector from '@material-ui/core/StepConnector';

const StepperConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  line: {
    borderColor: '#828282',
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

export default StepperConnector;
