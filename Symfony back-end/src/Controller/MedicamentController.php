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


use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use FOS\RestBundle\Controller\FOSRestController;

use Symfony\Component\HttpFoundation\ResponseHeaderBag;

class MedicamentController extends FOSRestController
{

       /**
     * Creates an Medicament resource
     * @Rest\Post("/Medicament/add")
     * @param Request $request
     * @return View
     */
    public function postMedicament(Request $request)
    {
        $medicament = new Medicament();
        $medicament->setName($request->get('name'));
        $medicament->setChronique('1');
        $medicament->setDuree($request->get('duree'));
        $medicament->setNbComprimeJour($request->get('nb'));
        $medicament->setRepas($request->get('repas'));
        $medicament->setSales($request->get('sales'));
        $medicament->setSucre($request->get('sucre'));
        
        $nb=$request->get('duree') ;
        $entityManager = $this->getDoctrine()->getManager();
        $patient=$entityManager->find(Patient::class,$request->get('patient'));
        $images=new Images();
        $images->setUrl("");
        $date = date('Y-m-d');

        $dataTime  = new \DateTime($date);
        $Time  = new \DateTime();

         $data = json_decode($request->get('comprime'), true);
           if (json_last_error() !== JSON_ERROR_NONE) {
            throw new BadRequestHttpException('invalid json body: ' . json_last_error_msg());
        }
        $request->request->replace(is_array($data) ? $data : array());
 $Datestart= new \DateTime($request->get('Date'));



for ($i=0; $i <$nb; $i++) { 
  $dates=new Dates();


 

 //   $entityManager->persist( $dates);

        // actually executes the queries (i.e. the INSERT query)
       // $entityManager->flush();
foreach($data as $event)
        {
        $alarme=new Alarme();
        $alarme->setDemarer(false);

        $alarme->setPause(false);
        $alarme->setStope(true);
        $comprime=new Comprime();
                $comprime->setPatient($patient);

                $comprime->addAlarme($alarme);

                $comprime->setPrisComp(false);

        $Time= \DateTime::createFromFormat('H:i',  $event);// unserialize 

                $comprime->setDatePris($dataTime);
                $comprime->setHeurepris($Time);
                $dates->setDateComprime($Datestart);
$dates->addComprime($comprime);
$medicament->addComprime($comprime);


       }
               $entityManager->persist($dates);
        $entityManager->flush();

       $ch="+1 day ";
       $Datestart->modify($ch);

}
        


     
 $medicament->addPatient($patient);
        $medicament->addImage($images);
        $entityManager->persist($medicament);

        // actually executes the queries (i.e. the INSERT query)
        $entityManager->flush();


        // In case our POST was a success we need to return a 201 HTTP CREATED response
        return new Response();
    }

    /**
 * Retrieves an Article resource
 * @Rest\Get("/Getarticles")
 * @return View
 */

  public function getArticles()
    {

$article =$this->getDoctrine()
        ->getRepository(Medicament::class)
        ->findAll();       // In case our GET was a success we need to return a 200 HTTP OK response with the collection of article object
                $view = View::create($article);

                $viewHandler = $this->get('fos_rest.view_handler');
 $view->setFormat('json');
        // Gestion de la réponse
        return $viewHandler->handle($view);
    }
    /**
 * Retrieves an Medicament resource
 * @Rest\Get("/Getarticle/{id}")
 * @return View
 */

  public function getMedicamentById(int $id)
    {

$Medicament =$this->getDoctrine()
        ->getRepository(Medicament::class)
        ->find($id);       
                $view = View::create($Medicament);

                $viewHandler = $this->get('fos_rest.view_handler');
 $view->setFormat('json');
        // Gestion de la réponse
        return $viewHandler->handle($view);
    }
 /**
 * Replaces Medicament resource
 * @Rest\Put("/Medicament/{idMedicament}/{idPatient}")
 * @param int $articleId
 * @param Request $request
 */


    public function putMedicament(int $idMedicament,int $idPatient,Request $request): View
    {
 $entityManager = $this->getDoctrine()->getManager();
 //echo $request->get('nbComprimeJour');
        $medicament=$entityManager->find(Medicament::class,$idMedicament);
                $medicament->setName($request->get('name'));
        $medicament->setChronique('1');
        $medicament->setDuree($request->get('duree'));
        $medicament->setRepas($request->get('repas'));
        $medicament->setSales($request->get('sales'));
        $medicament->setSucre($request->get('sucre'));
  
 
 $Comprime=$this->getDoctrine()->getRepository(Comprime::class)->findByidMedicament($idMedicament,$idPatient);


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

                return View::create($medicament, Response::HTTP_OK);
    }
        /**
 * Retrieves an Medicament resource
 * @Rest\Get("/MedicamentBySuiveur/{id}")
 * @return View
 */

  public function getMedicamentByIdSuiveur(int $id)
    {

$Medicament =$this->getDoctrine()
        ->getRepository(Medicament::class)
        ->findByIdSuiveur($id);       
                $view = View::create($Medicament);

                $viewHandler = $this->get('fos_rest.view_handler');
 $view->setFormat('json');
        // Gestion de la réponse
        return $viewHandler->handle($view);
    }

    /**
 * Removes the Article resource
 * @Rest\Delete("/remove/medicament/{id}")
 */
      public function DeleteMedicamentById(int $id)
    {
        $entityManager = $this->getDoctrine()->getManager();

$Medicament =$this->getDoctrine()
        ->getRepository(Medicament::class)
        ->find($id);
$entityManager->remove($Medicament);

$entityManager->flush();
                $view = View::create($Medicament);

                $viewHandler = $this->get('fos_rest.view_handler');
 $view->setFormat('json');
        // Gestion de la réponse
        return $viewHandler->handle($view);
    }
}
