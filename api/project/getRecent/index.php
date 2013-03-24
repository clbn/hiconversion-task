<?php

// sleep() here is for testing slow connections only and should be removed in production
sleep(1);

header('Content-Type: application/json;charset=utf-8');

print <<<QWERTYUIOP
{
  "result": [
    {
      "id": 1,
      "title": "Violent Mummy Training",
      "budget": 20123
    }, {
      "id": 21,
      "title": "My Little Pirate DS",
      "budget": 41266
    }, {
      "id": 37,
      "title": "Regal Bazooka Dystopia",
      "budget": 21214
    }, {
      "id": 44,
      "title": "Intellectual Train Pro",
      "budget": 66243
    }, {
      "id": 50,
      "title": "John Romero's Bass Maniac",
      "budget": 22999
    }, {
      "id": 12,
      "title": "Wrath of the Weight Loss - The Dark Project",
      "budget": 20000
    }
  ]
}
QWERTYUIOP;
