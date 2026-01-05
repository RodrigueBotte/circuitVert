<?php

namespace App\Controller\Api;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;

final class ApiRegisterController extends AbstractController
{
    #[Route('/api/register', name: 'app_api_register', methods: ['POST'])]
    public function register(Request $request, UserPasswordHasherInterface $passwordHasher, EntityManagerInterface $em): Response
    {
        // We receipe the JSON send by the frontend
        $data = json_decode($request->getContent(), true);

        // We check that the required fields are there
        if (!isset($data['email'], $data['password'], $data['type'])) {
            return $this->json(['error' => 'Missing fields'], 400);
        }

        // We check if the email already exist
        $existingUser = $em->getRepository(User::class)->findOneBy(['email'=> $data['email']]);
        if ($existingUser) {
            return $this->json(['error' => 'Email already used'], 400);
        }

        // We create a new user
        $user = new User();
        $user->setEmail($data['email']);
        $user->setType($data['type']);

        // Attribution automatily of the role
        if ($data['type'] === 'pro') {
            $user->setNom($data['nom']);
            $user->setSirret($data['siret']);
            $user->setRoles(['ROLE_PRO']);
        }else{
            $user->setRoles(['ROLE_USER']);
        }

        // Hash of the password
        $user->setPassword($passwordHasher->hashPassword($user, $data['password']));

        // Save the user in the database
        $em->persist($user);
        $em->flush();

        return $this->json([
            'status'=> 'success',
            'messages'=> 'User created successully',
        ], 201);
    }
}