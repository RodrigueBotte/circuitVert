<?php

namespace App\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class TestController extends AbstractController
{
    #[Route('/api/protected', name: 'api_protected', methods: ['GET'])]
    public function protected(): JsonResponse
    {
        return $this->json([
            'message' => 'Accès autorisé, tu es bien connecté 🚀',
            'user' => $this->getUser()->getUserIdentifier(),
        ]);
    }

    #[Route('/api/pro-only', name: 'api_pro_only', methods: ['GET'])]
    public function proOnlyRoute(): JsonResponse
    {
        $this->denyAccessUnlessGranted('ROLE_PRO');

        return $this->json([
            'message' => 'Bienvenue cher professionnel ✅'
        ]);
    }
}