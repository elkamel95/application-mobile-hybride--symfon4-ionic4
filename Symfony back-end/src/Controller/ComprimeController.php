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

class ComprimeController extends FOSRestController
{
/**
 * Replaces Article resource
 * @Rest\Put("/Comprime/{idComprime}")
 * @param int $articleId
 * @param Request $request
 */


    public function putArticle(int $idComprime , Request $request): View
    {
 $entityManager = $this->getDoctrine()->getManager();
  $Comprime=$this->getDoctrine()->getRepository(Comprime::class)->findByidMedicament($idComprime);


 $Time  = new \DateTime();

         $data = json_decode($request->get('comprime'), true);
           if (json_last_error() !== JSON_ERROR_NONE) {
            throw new BadRequestHttpException('invalid json body: ' . json_last_error_msg());
        }

        $request->request->replace(is_array($data) ? $data : array());
        $i=0;
              foreach($data as $Time)
{
	        $Time= \DateTime::createFromFormat('H:i',  $Time);// unserialize 

$Comprime[$i]->setHeurepris($Time);
 $i++;
}


$entityManager->flush();

                return View::create($Comprime, Response::HTTP_OK);
    }
    /**
 * Retrieves an Article resource
 * @Rest\Get("/GetComprime/{idMedicament}/{idPatient}")
 * @return View
 */

  public function GetComprimeByID(int $idMedicament,int $idPatient)
    {

$Medicament =$this->getDoctrine()
        ->getRepository(Comprime::class)
        ->findByidMedicament($idMedicament,$idPatient);       // In case our GET was a success we need to return a 200 HTTP OK response with the collection of Medicament object
                $view = View::create($Medicament);

                $viewHandler = $this->get('fos_rest.view_handler');
 $view->setFormat('json');
        // Gestion de la réponse
        return $viewHandler->handle($view);
    }
        /**
 * Retrieves an Article resource
 * @Rest\Get("/GetComprimes/date")
 * @return View
 */
      public function GetByDate()
    { 
       $date = date('Y-m-d');
$startDate = new \DateTime($date);
$startDate->modify("+1 day ");



$ComprimeByDate =$this->getDoctrine()
        ->getRepository(Comprime::class)
        ->findByDate($startDate);   

                $view = View::create($ComprimeByDate);

                $viewHandler = $this->get('fos_rest.view_handler');
 $view->setFormat('json');
        // Gestion de la réponse
        return $viewHandler->handle($view);
    }
}
