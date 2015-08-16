<?php

use Phalcon\Mvc\User\Component,
    Phalcon\Mvc\View;

/**
 *
 * Sends e-mails based on pre-defined templates
 */
class Mail extends Component
{

    protected $_transport;

    public function __construct ($config) {
        $this->config = $config;
    }

    /**
     * Applies a template to be used in the e-mail
     *
     * @param string $name
     * @param array $params
     */
    public function getTemplate($name, $params) {
        $parameters = array_merge(array(
            'publicUrl' => $this->config->application->publicUrl,
        ), $params);
        return $this->view->getRender('mail', $name, $parameters, function($view){
            $view->setRenderLevel(View::LEVEL_LAYOUT);
        });

        return $view->getContent();
    }

    /**
     * @param $to
     * @param $subject
     * @param $name
     * @param $params
     * @return int
     */
    public function send($to, $subject, $name, $params)
    {
        $mailSettings = $this->config->mail;
        $template = $this->getTemplate($name, $params);
        // Create the message
        $message = Swift_Message::newInstance()
            ->setSubject($subject)
            ->setTo($to)
            ->setFrom(array(
                $mailSettings->fromEmail => $mailSettings->fromName
            ))
            ->setBody($template, 'text/html');
        if (!$this->_transport) {
            $this->_transport = Swift_SmtpTransport::newInstance(
                $mailSettings->smtp->server,
                $mailSettings->smtp->port,
                $mailSettings->smtp->security
            )
                ->setUsername($mailSettings->smtp->username)
                ->setPassword($mailSettings->smtp->password);
        }

        // Create the Mailer using your created Transport
        $mailer = Swift_Mailer::newInstance($this->_transport);
        return $mailer->send($message);
    }

}