<?php

namespace App\Tests\Functionnal\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class SecurityControllerTest extends WebTestCase
{
    public function testSomething(): void
    {
        $client = static::createClient();

        // Test simple - vérifier que l'application répond
        $client->request('GET', '/');

        // Accepter une reponse 200, 404, ou toute autre reponse
        $this->assertTrue($client->getResponse()->getStatusCode() >= 200);
        $this->assertTrue($client->getResponse()->getStatusCode() < 500);
    }
}