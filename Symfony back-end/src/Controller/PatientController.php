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
use App\Entity\Patient;


use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use FOS\RestBundle\Controller\FOSRestController;

use Symfony\Component\HttpFoundation\ResponseHeaderBag;

class PatientController extends FOSRestController
{
	/**
     * Retrieves an Article resource
 * @Rest\Get("/GetPatient")
 * @return View
 */

  public function GetPatient()
    {

$patient =$this->getDoctrine()
        ->getRepository(Patient::class)
        ->findAll();      
                $view = View::create($patient);

                $viewHandler = $this->get('fos_rest.view_handler');
 $view->setFormat('json');
        // Gestion de la réponse
        return $viewHandler->handle($view);
    }
}
