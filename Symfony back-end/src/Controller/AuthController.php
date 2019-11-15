<?php

namespace App\Controller;

use FOS\RestBundle\Controller\Annotations\Version;
use FOS\RestBundle\Controller\Annotations\Route;
use FOS\RestBundle\View\View;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\Annotations as Post;
use FOS\RestBundle\Controller\Annotations as Put;

use Symfony\Component\Serializer\Serializer;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use App\Entity\Medicament;
use App\Entity\Patient;
use App\Entity\Images;
use App\Entity\Comprime;
use App\Entity\Alarme;
use App\Entity\Dates;

use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use FOS\RestBundle\Controller\FOSRestController;

use Symfony\Component\HttpFoundation\ResponseHeaderBag;
use App\Entity\Suiveur;
use App\Entity\Utilisateur;
class AuthController extends FOSRestController
{
     /**
     * Creates an Medicament resource
     * @Rest\Post("/Utilisateur/add")
     * @param Request $request
     * @return View
     */
    public function add(Request $request)

    {
       
       
    }
}
