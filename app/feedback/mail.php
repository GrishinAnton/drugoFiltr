<?php

$recepient = "leadchecker@dogmaweb.ru";
$from_email = "no-reply@dogmaweb.ru";//Если поставить @mail.ru, то письма доходить не будут
// Заголовки с кодировкой
//Кодирование заголовков
$from_name_inner = "Тест Лида";
$sitename = "Тест Лида";

$pagetitle = 'Заявка с сайта «' . $sitename .  "»";

$from_name = '=?UTF-8?B?'.base64_encode($from_name_inner).'?='; 
$subject = '=?UTF-8?B?'.base64_encode($pagetitle).'?='; 
//end


$headers = "Return-Path: <" . $from_email . ">\r\n";
$headers .= "From: " . $from_name . " <" . $from_email . ">\r\n";
$headers .= "Reply-To: " . $from_name . " <" . $from_email . ">\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=\"utf-8\"\r\n";
$headers .= "Content-Transfer-Encoding: 8bit\r\n";


$name = trim($_POST["name"]);
$phone = trim($_POST["tel"]);
$amount = trim($_POST["amount"]);
$utm_source = trim($_POST["utm_source"]);
$utm_medium = trim($_POST["utm_medium"]);
$utm_campaign = trim($_POST["utm_campaign"]);
$utm_content = trim($_POST["utm_content"]);
$utm_term = trim($_POST["utm_term"]);


$message = trim($_POST["inputTitle"]);



$data['message'] = $message ;

$data['sitename'] = $sitename;
$data['sent_fields'] = array(
    array('title' => 'Имя', 'value' => $name),
    array('title' => 'Телефон', 'value' => $phone),
    array('title' => 'Скидка', 'value' => $amount)

    );
$data['utm-close'] = $utm_source;//Если меток нету, то блок не отображается
$data['utm'] = array(
    array('title' => 'utm_source', 'value' => $utm_source),
    array('title' => 'utm_medium', 'value' => $utm_medium),
    array('title' => 'utm_campaign', 'value' => $utm_campaign),
    array('title' => 'utm_content', 'value' => $utm_content),
    array('title' => 'utm_term', 'value' => $utm_term)
    );

$service = $_SERVER['HTTP_USER_AGENT'];//Служебная информация
$data['service'] = $service;

$template_developer = "templates/prod/template-developer.tpl";
$body_for_developer = websun_parse_template_path($data, $template_developer);

//Сообщение
$message = $body_for_developer;

mail($recepient, $subject, $message, $headers);