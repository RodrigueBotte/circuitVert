<?php

namespace App\Controller\Api;

use App\Entity\User as UserEntity;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[Route('/api/user')]
final class UserController extends AbstractController
{
    #[Route('/me', name: 'user_me', methods: ['GET'])]
    #[IsGranted('IS_AUTHENTICATED_FULLY')]
    public function me(): JsonResponse
    {
        /** @var User $user */
        $user = $this->getUser();

        $response = [
            'id' => $user->getId(),
            'email' => $user->getEmail(),
            'type' => $user->getType(),
            'roles' => $user->getRoles(),
        ];

        // Ajouter nom et siret si c'est un professionnel
        if ($user->getType() === 'pro') {
            $response['nom'] = $user->getNom();
            $response['siret'] = $user->getSirret();
        }

        return $this->json($response);
    }

    #[Route('/me', name: 'user_update_me', methods: ['PUT'])]
    #[IsGranted('IS_AUTHENTICATED_FULLY')]
    public function updateMe(
        Request $request,
        EntityManagerInterface $em,
        UserPasswordHasherInterface $passwordHasher
    ): JsonResponse {

        /** @var UserEntity $user */
        $user = $this->getUser();

        $data = json_decode($request->getContent(), true);

        if (isset($data['email'])) {
            $user->setEmail($data['email']);
        }

        if (isset($data['password'])) {
            $hashedPassword = $passwordHasher->hashPassword($user,  $data['password']);
            $user->setPassword($hashedPassword);
        }

        if ($user->getType() === 'pro') {
            if (isset($data['nom'])) {
                $user->setNom($data['nom']);
            }
            if (isset($data['siret'])) {
                $user->setSirret($data['siret']);
            }
        }

        $em->flush();

        return $this->json(['message' => 'Vos informations ont été mises à jour avec succès']);
    }

    #[Route('/me', name: 'user_delete_me', methods: ['DELETE'])]
    #[IsGranted('IS_AUTHENTICATED_FULLY')]
    public function deleteMe(EntityManagerInterface $em): JsonResponse
    {
        /** @var User $user */
        $user = $this->getUser();

        $em->remove($user);
        $em->flush();

        // Quand l’utilisateur supprime son compte, le token JWT qu’il a encore devient invalide
        return $this->json(['message' => 'Votre compte a été supprimé avec succès']);
    }
}