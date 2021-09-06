<?php

namespace App\Controller\Api;

use App\Entity\User;
use App\Entity\Foodtruck;
use App\Repository\FoodtruckRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class FoodTruckController extends AbstractController
{
    /**
     * Get all foodtruck for listing
     * 
     * @Route("/api/foodtruck", name="api_foodtruck_truck", methods="GET")
     */
    public function list(FoodtruckRepository $foodtruckRepository): Response
    {
        $foodtruck = $foodtruckRepository->findAll();

        return $this->json($foodtruck, Response::HTTP_OK, [], ['groups' => 'foodtruck_get']);
    }

    /**
     * Get all foodtruck for search 
     * 
     * @Route("/api/foodtruck/search", name="api_foodtruck_truck_search", methods="GET")
     */
    public function search(FoodtruckRepository $foodtruckRepository): Response
    {
        $foodtruck = $foodtruckRepository->findAll();

        return $this->json($foodtruck, Response::HTTP_OK, [], ['groups' => 'foodtruck_get']);
    }

    /**
     * Get a foodtruck by id
     * 
     * @Route("/api/foodtruck/{id<\d+>}", name="api_foodtruck_get_item", methods="GET")
     */
    public function show(Foodtruck $Foodtruck = null): Response
    {
        if ($Foodtruck === null) {
            return new JsonResponse(
                ["message" => "FoodTruck non trouvée !"],
                Response::HTTP_NOT_FOUND
            );
        }
        // /!\ JSON Hijacking
        return $this->json($Foodtruck, Response::HTTP_OK, [], ['groups' => 'foodtruck_get']);
    }

    /**
     * @Route("/api/foodtruck/create", name="api_foodtruck_create", methods="POST")
     * @IsGranted("ROLE_PRO")
     */
    public function create(Request $request, SerializerInterface $serializer, EntityManagerInterface $entityManager, ValidatorInterface $validator): Response
    {


        // On récupère le contenu de la requête (du JSON)
        $jsonContent = $request->getContent();

        // On désérialise le JSON vers une entité foodtruck
        $foodtruck = $serializer->deserialize($jsonContent, Foodtruck::class, 'json');
        // on vient ajouter automatiquement user_id donc -> l'user qui add un foodtruck
        $foodtruck->setUser($this->getUser());

        if($foodtruck->getPicture() == null){

            $foodtruck->setPicture("https://i.ibb.co/kggSPWy/logo-FINAL.png");
        }

        // On valide l'entité avec le service Validator
        $errors = $validator->validate($foodtruck);



        // Affichage des erreurs
        if (count($errors) > 0) {

            $newErrors = [];

            foreach ($errors as $error) {

                $newErrors[$error->getPropertyPath()][] = $error->getMessage();
            }

            return new JsonResponse(["errors" => $newErrors], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        // On persist, on flush
        $entityManager->persist($foodtruck);
        $entityManager->flush();

        return $this->json($foodtruck, Response::HTTP_CREATED, [], ['groups' => 'foodtruck_post']);
    }

    /**
     * @Route("/api/foodtruck/edit/{id<\d+>}", name="api_foodtruck_edit", methods={"PUT"})
     * @IsGranted("ROLE_PRO")
     */
    public function itemEdit(Foodtruck $foodtruck = null, SerializerInterface $serializer, ValidatorInterface $validator, EntityManagerInterface $entityManager, Request $request): Response
    {
        
        // foodtruck non trouvé
        if ($foodtruck === null) {
            return new JsonResponse(
                ["message" => "Foodtruck non trouvé"],
                Response::HTTP_NOT_FOUND
            );
        }

        $data = $request->getContent();

        $foodtruck = $serializer->deserialize($data, Foodtruck::class, 'json', [AbstractNormalizer::OBJECT_TO_POPULATE => $foodtruck]);

        // On valide l'entité
        $errors = $validator->validate($foodtruck);

        // Affichage des erreurs
        if (count($errors) > 0) {
            $newErrors = [];

            foreach ($errors as $error) {
                $newErrors[$error->getPropertyPath()][] = $error->getMessage();
            }

            return new JsonResponse(["errors" => $newErrors], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        // Enregistrement en BDD
        $entityManager->flush();

        return new JsonResponse(["message" => "foodtruck modifié"], Response::HTTP_OK);
    }
    /**
     * Delete a Foodtruck
     * 
     * @Route("/api/foodtruck/delete/{id<\d+>}", name="api_foodtruck_delete", methods="DELETE")
     * @IsGranted("ROLE_PRO")
     */
    public function delete(Foodtruck $foodtruck = null, EntityManagerInterface $em)
    {
        if (null === $foodtruck) {

            $error = 'Cette Foodtruck n\'existe pas';

            return $this->json(['error' => $error], Response::HTTP_NOT_FOUND);
        }
        $em->remove($foodtruck);
        $em->flush();

        return $this->json(['message' => 'Le Foodtruck a bien été supprimé.'], Response::HTTP_OK,[],['groups' => 'delete_foodtruck']);
    }
}
