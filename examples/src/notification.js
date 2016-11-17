
const { Message, Notification } = zui;

let App = React.createClass({

    msg1() {
        Message.msg('This is some message.')
    },

    msg2() {
        Message.info('This is a info message.')
    },

    msg3() {
        Message.success('This is a success message.')
    },

    msg4() {
        Message.warning('This is a warning message.')
    },

    msg5() {
        Message.error('This is an error message.')
    },

    msg6() {
        Message.info('This is a long message. SSSSSSSSSSSS SSSSSSS, dDDDDDDDDDD DDDDDDDDD, JJJJJJJJJJJJJ JJJJJJJJJJ JJJJJJJJJJJJJJ JJJJJJJJJ')
    },

    notice1() {
        Notification.open({
            title: 'notificatoin title',
            content: 'sioj ,sd,f lkjlsdf, s fsldkjfs df, fsld jfsldkf sd f,ljsdlkfsdf.'
        });
    },

    notice2() {
        Notification.open({
            type: 'info',
            title: 'notificatoin title',
            content: 'sioj ,sd,f lkjlsdf, s fsldkjfs df, fsld jfsldkf sd f,ljsdlkfsdf.'
        });
    },

    notice3() {
        Notification.open({
            type: 'success',
            title: 'notificatoin title',
            content: 'sioj ,sd,f lkjlsdf, s fsldkjfs df, fsld jfsldkf sd f,ljsdlkfsdf.'
        });
    },

    notice4() {
        Notification.open({
            type: 'warning',
            title: 'notificatoin title',
            content: 'sioj ,sd,f lkjlsdf, s fsldkjfs df, fsld jfsldkf sd f,ljsdlkfsdf.'
        });
    },

    notice5() {
        Notification.open({
            type: 'error',
            autoClose: false,
            title: 'notificatoin title',
            content: 'sioj ,sd,f lkjlsdf, s fsldkjfs df, fsld jfsldkf sd f,ljsdlkfsdf.'
        });
    },

    render() {

        return (
            <div>
                <section>
                    <a onClick={this.msg1}>Message</a>
                </section>
                <section>
                    <a onClick={this.msg2}>Info message</a>
                </section>
                <section>
                    <a onClick={this.msg3}>Success message</a>
                </section>
                <section>
                    <a onClick={this.msg4}>Warning message</a>
                </section>
                <section>
                    <a onClick={this.msg5}>Error message</a>
                </section>
                <section>
                    <a onClick={this.msg6}>Long message</a>
                </section>
                <hr/>
                <section>
                    <a onClick={this.notice1}>Notification</a>
                </section>
                <section>
                    <a onClick={this.notice2}>Info Notification</a>
                </section>
                <section>
                    <a onClick={this.notice3}>Success Notification</a>
                </section>
                <section>
                    <a onClick={this.notice4}>Warning Notification</a>
                </section>
                <section>
                    <a onClick={this.notice5}>Error Notification</a>
                </section>
            </div>
        )
    }
})

ReactDOM.render(
    <App />,
    document.getElementById('App')
)