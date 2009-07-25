function GMail(user, pass) {

    /* Add to app.properties */
    /*
     mail.transport.protocol = smtps
     mail.smtps.host = smtp.gmail.com
     mail.smtps.user = your.username@gmail.com
     mail.smtps.pass = *****
     mail.smtps.port = 465
     mail.smtps.auth = true
     mail.smtps.debug = true
     */

    this.user = user;
    this.pass = pass;

    this.sendMail = function(to,subject,text,cc,bcc){

        var jmail = javax.mail;

        var props = new java.util.Properties();

        for(var p in app.properties){
            if(p.indexOf('mail') === 0) {
                props.setProperty(p, app.properties[p]);
            }
        }

        var host = props.get('mail.smtps.host');
        var port = props.get('mail.smtps.port');
        var userName = this.user || props.get('mail.smtps.user');
        var passWord = this.pass || props.get('mail.smtps.pass');

        cc = cc || [];
        bcc = bcc || [];

        try {
            var session = jmail.Session.getDefaultInstance(props);
//            session.setDebug(true);
            var msg = new jmail.internet.MimeMessage(session);
            msg.setText(text);
            msg.setSubject(subject);
            msg.setFrom(new jmail.internet.InternetAddress(userName));

            for(var i=0; i<to.length; i++){
                msg.addRecipient(jmail.Message.RecipientType.TO, new jmail.internet.InternetAddress(to[i]));
            }
            for(var i=0;i<cc.length;i++){
                msg.addRecipient(jmail.Message.RecipientType.CC, new jmail.internet.InternetAddress(cc[i]));
            }
            for(var i=0;i<bcc.length;i++){
                msg.addRecipient(jmail.Message.RecipientType.BCC, new jmail.internet.InternetAddress(bcc[i]));
            }
            msg.saveChanges();
            var transport = session.getTransport('smtps');
            transport.connect(host, port, userName, passWord);
            transport.sendMessage(msg, msg.getAllRecipients());
            transport.close();
            return true;
        } catch (mex) {
            app.log([mex.message, mex.fileName, mex.lineNumber].join (':'));
        }
    }
}
