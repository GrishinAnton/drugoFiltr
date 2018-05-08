<?php

$recepient = "leadchecker@dogmaweb.ru";
$sitename = "Батутный парк №1";
$from_name  = "Батутный парк №1";
$from_email = "no-reply@dogmaweb.ru";


$headers = "Return-Path: <" . $from_email . ">\r\n";
$headers .= "From: " . $from_name . " <" . $from_email . ">\r\n";
$headers .= "Reply-To: " . $from_name . " <" . $from_email . ">\r\n";
$headers .= "Content-type: text/html; charset=\"utf-8\"\r\n";
$headers .= "Content-Transfer-Encoding: 8bit\r\n";


$name = trim($_POST["name"]);
$phone = trim($_POST["tel"]);
$amount = trim($_POST["amount"]);
$message = trim($_POST["inputTitle"]);
$message = "$message\n <br>Имя: $name\n <br>Телефон: $phone\n<br> Скидка: $amount";


$pagetitle = 'Заявка с сайта «' . $sitename .  "»";
mail($recepient, $pagetitle, $message, $headers);
