<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Form\ContactType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Translation\TranslatableMessage;

class HomepageController extends AbstractController
{
    #[Route('/')]
    public function indexNoLocale(): Response
    {
        return $this->redirectToRoute('app_homepage', ['_locale' => 'en']);
    }

    #[Route('/{_locale}', name: 'app_homepage')]
    public function index(Request $request): Response
    {
       $form = $this->createFormBuilder()->create('contactForm', ContactType::class)->getForm();
        
       $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->addFlash('success', new TranslatableMessage('i_have_apples', ['%apples%' => $form->getData()['applesCount']]));

            return $this->redirectToRoute('app_homepage');
        }

        return $this->render('homepage/index.html.twig', [
            'controller_name' => 'HomepageController',
            'contact_form' => $form->createView()
        ]);
    }
}

