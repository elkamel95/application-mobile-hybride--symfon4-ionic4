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
use App\Entity\Suiveur;
use App\Entity\Utilisateur;

use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use FOS\RestBundle\Controller\FOSRestController;

use Symfony\Component\HttpFoundation\ResponseHeaderBag;

class AlarmeController extends FOSRestController
{
     /**
 * Replaces Article resource
 * @Rest\Put("/putAlarme/{idComprime}")
 * @param int $idComprime
 * @param Request $request
 */
   
       


    public function putAlarme(int $idComprime , Request $request): View
    {
 $entityManager = $this->getDoctrine()->getManager();
  $Alarme=$this->getDoctrine()->getRepository(Alarme::class)->findByiComprime($idComprime);
if($request->get('d')!= null)
  $Alarme->setDemarer($request->get('d'));
if($request->get('p') !=null)
  $Alarme->setPause($request->get('p'));
if($request->get('s')!=null)
  $Alarme->setStope($request->get('s'));
$entityManager->flush();
                  return View::create($Alarme, Response::HTTP_OK);

}
    }

