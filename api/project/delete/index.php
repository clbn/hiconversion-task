<?php

// sleep() here is for testing slow connections only and should be removed in production
sleep(1);

header('Content-Type: application/json;charset=utf-8');

// Tossing coin...
if (mt_rand(1,2) > 1) {
  print '{ "result": "Ok", "message": "Project(s) successfully deleted" }';
} else {
  print '{ "result": "Error", "message": "Some error occured, try again" }';
}
