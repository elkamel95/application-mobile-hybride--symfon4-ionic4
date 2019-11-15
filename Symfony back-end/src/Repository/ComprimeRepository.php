<?php

namespace App\Repository;

use App\Entity\Comprime;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Comprime|null find($id, $lockMode = null, $lockVersion = null)
 * @method Comprime|null findOneBy(array $criteria, array $orderBy = null)
 * @method Comprime[]    findAll()
 * @method Comprime[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ComprimeRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Comprime::class);
    }


    public function findByidMedicament($idMedicament,$idPatient)
    {
        return  $this->createQueryBuilder('c')
        // p.category refers to the "category" property on product
        ->innerJoin('c.medicament', 'm')       
        ->innerJoin('c.patient', 'p')

        // selects all the category data to avoid the query
        ->addSelect('c')
        ->andWhere('m.id = :id')->andWhere('p.id = :idPatient')
        ->setParameter('id', $idMedicament)
        ->setParameter('idPatient', $idPatient)

        ->getQuery()
        ->getResult();
    }
  public function findByDate( $date )
    {

        return  $this->createQueryBuilder('c')
        ->Join('c.date', 'd')
        // selects all the category data to avoid the query
        ->addSelect('c')
        // p.category refers to the "category" property on produc
        ->andWhere('d.dateComprime = :dates')
        ->setParameter('dates', $date->format('Y-m-d'))
        ->getQuery()
        ->getResult();
    }
    /*
    public function findOneBySomeField($value): ?Comprime
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
