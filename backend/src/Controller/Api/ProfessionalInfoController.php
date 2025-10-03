<?php

namespace App\Controller\Api;

use App\Entity\ProfessionalInfo;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[Route('/api/professional/info', name: 'app_api_professional_info')]
final class ProfessionalInfoController extends AbstractController
{
    #[Route('/{id}', name: "pi_show", methods:['GET'])]
    public function Show(ProfessionalInfo $pi): JsonResponse {
        return $this->json([
            'id'=>$pi->getId(),
            'nomFarm'=> $pi->getNameSociety(),
            'description' => $pi->getDescription(),
            'photos' => $pi->getPhotos(),
            'paiement' => $pi->getPayment()
        ]);
    }

    #[Route('', name: 'pi_create', methods: ['POST'])]
    #[IsGranted('ROLE_PRO')]
    public function Create(Request $rq, EntityManagerInterface $em): JsonResponse {

        // On indique que $user es une instance de User
        /** @var User $user */
        $user = $this->getUser();

        if ($user->getProfessionalInfo()) {
            return $this->json(['error' => 'Vous avez déjà une ProfessionalInfo'], 400);
        }

        $data = json_decode($rq->getContent(), true);
        $pi= new ProfessionalInfo();
        $pi->setNameSociety($data['nomFirme'] ?? '');
        $pi->setDescription($data['description'] ?? null);
        $pi->setPhotos($data['photos'] ?? []);
        $pi->setPayment($data['moyensPaiement'] ?? []);
        $pi->setUser($user);
        $user->setProfessionalInfo($pi);

        $em->persist($pi);
        $em->flush();

        return $this->json(['message' => 'ProfessionalInfo créée avec succès', 'id' => $pi->getId()], 201);
    }

    #[Route('/{id}', name: 'pi_update', methods: ['PUT'])]
    #[IsGranted('ROLE_PRO')]
    public function update(Request $request, ProfessionalInfo $pi, EntityManagerInterface $em): JsonResponse
    {
        $user = $this->getUser();

        if ($pi->getUser() !== $user) {
            return $this->json(['error' => 'Vous ne pouvez modifier que votre propre ProfessionalInfo'], 403);
        }

        $data = json_decode($request->getContent(), true);

        $pi->setNameSociety($data['nomFirme'] ?? $pi->getNameSociety());
        $pi->setDescription($data['description'] ?? $pi->getDescription());
        $pi->setPhotos($data['photos'] ?? $pi->getPhotos());
        $pi->setPayment($data['moyensPaiement'] ?? $pi->getPayment());

        $em->flush();

        return $this->json(['message' => 'ProfessionalInfo mise à jour avec succès']);
    }

    #[Route('/{id}', name: 'pi_delete', methods: ['DELETE'])]
    #[IsGranted('ROLE_PRO')]
    public function delete(ProfessionalInfo $pi, EntityManagerInterface $em): JsonResponse
    {
        $user = $this->getUser();

        if ($pi->getUser() !== $user) {
            return $this->json(['error' => 'Vous ne pouvez supprimer que votre propre ProfessionalInfo'], 403);
        }

        $em->remove($pi);
        $em->flush();

        return $this->json(['message' => 'ProfessionalInfo supprimée avec succès']);
    }
    
}