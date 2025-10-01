<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class ProfessionalInfoController extends AbstractController
{
    #[Route('/api/professional/info', name: 'app_api_professional_info')]
    public function index(): Response
    {
        return $this->render('api/professional_info/index.html.twig', [
            'controller_name' => 'Api/ProfessionalInfoController',
        ]);
    }
}