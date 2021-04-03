import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import animateScrollTo from 'animated-scroll-to';
// import { closeDrawer } from '../store/actions/index';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';


class ScrollToTop extends Component<any> {
    componentDidMount() {
        if (this.props.location.hash) {
            // animateScrollTo(document.querySelector(this.props.location.hash));
            // document.addEventListener('DOMContentLoaded', () => animateScrollTo(document.querySelector(this.props.location.hash)))
        }
    }

    componentDidUpdate(prevProps: any) {

        if (this.props.location !== prevProps.location) {
            // this.props.closeDrawer();
        }

        if (this.props.location.pathname !== prevProps.location.pathname) {
            if (this.props.location.hash) {
                animateScrollTo(document.querySelector(this.props.location.hash));
            } else {
                setTimeout(() => window.scrollTo(0, 0), 100);

            }

        } else if (this.props.location.hash && this.props.location.hash !== prevProps.location.hash) {
            animateScrollTo(document.querySelector(this.props.location.hash));
        } else if (this.props.location.hash) {
            animateScrollTo(document.querySelector(this.props.location.hash));
        }
    }

    render() {
        return this.props.children;
    }
}


const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        // closeDrawer: () => dispatch(closeDrawer())
    }
}


export default connect(null, mapDispatchToProps)(withRouter(ScrollToTop));