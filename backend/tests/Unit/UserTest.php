<?php

namespace App\Tests\Unit\Entity;

use App\Entity\User;
use PHPUnit\Framework\TestCase;

class UserTest extends TestCase
{
    public function testCreateUser():void
    {
        $user = new User();
        $user->setEmail('test@example.com');

        $this->assertEquals('test@example.com', $user->getEmail());
        $this->assertInstanceOf(User::class, $user);
    }

    public function testUserRoles(): void
    {
        $user = new User();

        // Vérifie que l'utilisateur a le rôle USER par défaut
        $this->assertContains('ROLE_USER', $user->getRoles());
    }
}