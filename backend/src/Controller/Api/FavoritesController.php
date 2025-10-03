<?php

namespace App\Controller\Api;

use App\Repository\ProfessionalInfoRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use App\Entity\User as UserEntity;

#[Route('/api/favorites')]
final class FavoritesController extends AbstractController
{
    #[Route('', name: 'favorites_list', methods: ['GET'])] 
    #[IsGranted('IS_AUTHENTICATED_FULLY')]
    public function list(): JsonResponse
    {
        /** @var UserEntity $user */ 
        $user = $this->getUser();
        $out = [];
        foreach ($user->getFavorites() as $pi) {
            $out[] = ['id' => $pi->getId(), 'nameSociety' => $pi->getNameSociety(), 'description' => $pi->getDescription(),];
        }
        return $this->json($out);
    }

    #[Route('/{id}', name: 'favorites_add', methods: ['POST'])] 
    #[IsGranted('IS_AUTHENTICATED_FULLY')] 
    public function add(int $id, ProfessionalInfoRepository $repo, EntityManagerInterface $em): JsonResponse
    {
        $pi = $repo->find($id);
        if (!$pi) {
            return $this->json(['error' => 'ProfessionalInfo introuvable'], 404);
        }
        /** @var UserEntity $user */
        $user = $this->getUser();

        if ($user->isFavorite($pi)) {
            return $this->json(['message' => 'Déjà en favoris'], 200);
        }
        $user->addFavorite($pi);
        $em->flush();
        return $this->json(['message' => 'Ajouté en favoris']);
    }

    #[Route('/{id}', name: 'favorites_remove', methods: ['DELETE'])] 
    #[IsGranted('IS_AUTHENTICATED_FULLY')] 
    public function remove(int $id, ProfessionalInfoRepository $repo, EntityManagerInterface $em): JsonResponse
    {
        $pi = $repo->find($id);
        if (!$pi) {
            return $this->json(['error' => 'ProfessionalInfo introuvable'], 404);
        }
        /** @var UserEntity $user */ 
        $user = $this->getUser();
        
        if (!$user->isFavorite($pi)) {
            return $this->json(['message' => "N'était pas en favoris"], 200);
        }
        $user->removeFavorite($pi);
        $em->flush();
        return $this->json(['message' => 'Retiré des favoris']);
    }
}
